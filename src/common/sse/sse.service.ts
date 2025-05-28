import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Response } from 'express';
import { EventType } from './event.type';
import {
    EventClassNextInvStartForm,
    EventTeamInvEndForm,
    EventTeamPartInForm,
    EventClassCancelForm
} from './event.form';

@Injectable()
export class SseService implements OnModuleDestroy {
    private classClients: Map<number, Response[]> = new Map();
    private studentClients: Map<number, Response[]> = new Map();
    private pingIntervals: Map<Response, NodeJS.Timeout> = new Map();

    private setupSseHeaders(res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no'); // Nginx 프록시 사용 시 필요
        res.flushHeaders();
    }

    private setupPingInterval(res: Response) {
        // 이미 존재하는 interval이 있다면 제거
        this.clearPingInterval(res);

        const interval = setInterval(() => {
            try {
                if (res.writableEnded) {
                    this.clearPingInterval(res);
                    return;
                }
                res.write('event: ping\n');
                res.write('data: {"timestamp":"' + new Date().toISOString() + '"}\n\n');
            } catch (error) {
                console.error('Ping send error:', error);
                this.clearPingInterval(res);
            }
        }, 1000);

        this.pingIntervals.set(res, interval);
    }

    private clearPingInterval(res: Response) {
        const interval = this.pingIntervals.get(res);
        if (interval) {
            clearInterval(interval);
            this.pingIntervals.delete(res);
        }
    }

    private cleanupClient(res: Response) {
        this.clearPingInterval(res);
        if (!res.writableEnded) {
            res.end();
        }
    }

    addTeacherClient(classId: number, res: Response) {
        if (!this.classClients.has(classId)) {
            this.classClients.set(classId, []);
        }
        this.classClients.get(classId)!.push(res);

        this.setupSseHeaders(res);
        this.setupPingInterval(res);

        res.write(
            `data: ${JSON.stringify({ message: `id ${classId}번의 수업 기관 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );

        res.on('close', () => {
            this.cleanupClient(res);
            this.sendToAllStudents(EventType.CLASS_CANCEL, new EventClassCancelForm(classId));
            this.removeTeacherClient(classId, res);
        });

        res.on('error', () => {
            this.cleanupClient(res);
            this.removeTeacherClient(classId, res);
        });
    }

    addStudentClient(studentId: number, res: Response) {
        if (!this.studentClients.has(studentId)) {
            this.studentClients.set(studentId, []);
        }
        this.studentClients.get(studentId)!.push(res);

        this.setupSseHeaders(res);
        this.setupPingInterval(res);

        res.write(
            `data: ${JSON.stringify({ message: `id ${studentId}번의 학생 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );

        res.on('close', () => {
            this.cleanupClient(res);
            this.removeStudentClient(studentId, res);
        });

        res.on('error', () => {
            this.cleanupClient(res);
            this.removeStudentClient(studentId, res);
        });
    }

    sendToTeacher(
        classId: number,
        event: EventType,
        data: EventTeamPartInForm | EventTeamInvEndForm
    ) {
        const clients = this.classClients.get(classId);
        if (clients) {
            clients.forEach((res) => {
                res.write(`event: ${event}\n`);
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            });
        }
    }

    sendToStudent(studentId: number, event: EventType, data: EventClassNextInvStartForm) {
        const clients = this.studentClients.get(studentId);
        if (clients) {
            clients.forEach((res) => {
                res.write(`event: ${event}\n`);
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            });
        }
    }

    sendToAllStudents(event: EventType, data: EventClassNextInvStartForm | EventClassCancelForm) {
        this.studentClients.forEach((clients) => {
            clients.forEach((res) => {
                res.write(`event: ${event}\n`);
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            });
        });
    }

    removeTeacherClient(classId: number, res: Response) {
        const clients = this.classClients.get(classId);
        if (clients) {
            this.classClients.set(
                classId,
                clients.filter((client) => client !== res)
            );
        }
        res.end();
    }

    removeStudentClient(studentId: number, res: Response) {
        const clients = this.studentClients.get(studentId);
        if (clients) {
            this.studentClients.set(
                studentId,
                clients.filter((client) => client !== res)
            );
        }
        res.end();
    }

    onModuleDestroy() {
        // 모든 interval 정리
        this.pingIntervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.pingIntervals.clear();
    }
}
