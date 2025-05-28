import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { EventType } from './event.type';
import {
    EventClassNextInvStartForm,
    EventTeamInvEndForm,
    EventTeamPartInForm,
    EventClassCancelForm
} from './event.form';

@Injectable()
export class SseService {
    private classClients: Map<number, Response[]> = new Map();
    private studentClients: Map<number, Response[]> = new Map();

    private setupSseHeaders(res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // 헤더 강제 플러시
    }

    addTeacherClient(classId: number, res: Response) {
        if (!this.classClients.has(classId)) {
            this.classClients.set(classId, []);
        }
        this.classClients.get(classId)!.push(res);
    
        this.setupSseHeaders(res);
        res.write(
            `data: ${JSON.stringify({ message: `id ${classId}번의 수업 기관 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );
    
        // 30초마다 ping 이벤트 전송
        const pingInterval = setInterval(() => {
            res.write(`event: ping\ndata: ${JSON.stringify({ timestamp: new Date().toISOString() })}\n\n`);
        }, 30000);
    
        res.on('close', () => {
            clearInterval(pingInterval); // 연결 종료 시 interval 정리
            this.sendToAllStudents(EventType.CLASS_CANCEL, new EventClassCancelForm(classId));
            this.removeTeacherClient(classId, res);
        });
    }

    addStudentClient(studentId: number, res: Response) {
        if (!this.studentClients.has(studentId)) {
            this.studentClients.set(studentId, []);
        }
        this.studentClients.get(studentId)!.push(res);
    
        this.setupSseHeaders(res);
        res.write(
            `data: ${JSON.stringify({ message: `id ${studentId}번의 학생 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );
    
        // 30초마다 ping 이벤트 전송
        const pingInterval = setInterval(() => {
            res.write(`event: ping\ndata: ${JSON.stringify({ timestamp: new Date().toISOString() })}\n\n`);
        }, 30000);
    
        res.on('close', () => {
            clearInterval(pingInterval); // 연결 종료 시 interval 정리
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
}
