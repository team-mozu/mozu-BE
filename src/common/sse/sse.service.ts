import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { EventType } from './event.type';
import { EventClassNextInvStartForm, EventTeamInvEndForm, EventTeamPartInForm } from './event.form';

@Injectable()
export class SseService {
    private classClients: Map<number, Response[]> = new Map();
    private studentClients: Map<number, Response[]> = new Map();

    // 선생님 클라이언트 연결
    addTeacherClient(classId: number, res: Response) {
        if (!this.classClients.has(classId)) {
            this.classClients.set(classId, []);
        }
        this.classClients.get(classId)!.push(res);

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        });

        (res as any).write(
            `data: ${JSON.stringify({ message: `id ${classId}번의 수업 기관 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );

        (res as any).on('close', () => {
            this.removeTeacherClient(classId, res);
        });
    }

    // 학생 클라이언트 연결
    addStudentClient(studentId: number, res: Response) {
        if (!this.studentClients.has(studentId)) {
            this.studentClients.set(studentId, []);
        }
        this.studentClients.get(studentId)!.push(res);

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        });

        (res as any).write(
            `data: ${JSON.stringify({ message: `id ${studentId}번의 학생 클라이언트 SSE 연결되었습니다.` })}\n\n`
        );

        (res as any).on('close', () => {
            this.removeStudentClient(studentId, res);
        });
    }

    // 특정 선생님에게 이벤트 전송
    sendToTeacher(
        classId: number,
        event: EventType,
        data: EventTeamPartInForm | EventTeamInvEndForm
    ) {
        const clients = this.classClients.get(classId);

        if (clients) {
            clients.forEach((res) => {
                (res as any).write(`event: ${event}\n`);
                (res as any).write(`data: ${JSON.stringify(data)}\n\n`);
            });
        }
    }

    // 특정 학생에게 이벤트 전송
    sendToStudent(studentId: number, event: EventType, data: EventClassNextInvStartForm) {
        const clients = this.studentClients.get(studentId);

        if (clients) {
            clients.forEach((res) => {
                (res as any).write(`event: ${event}\n`);
                (res as any).write(`data: ${JSON.stringify(data)}\n\n`);
            });
        }
    }

    // 모든 학생들에게 이벤트 전송
    sendToAllStudents(event: EventType, data: EventClassNextInvStartForm) {
        this.studentClients.forEach((clients) => {
            clients.forEach((res) => {
                (res as any).write(`event: ${event}\n`);
                (res as any).write(`data: ${JSON.stringify(data)}\n\n`);
            });
        });
    }

    // 선생님 연결 해제
    removeTeacherClient(classId: number, res: Response) {
        const clients = this.classClients.get(classId);
        if (clients) {
            this.classClients.set(
                classId,
                clients.filter((client) => client !== res)
            );
        }
    }

    // 학생 연결 해제
    removeStudentClient(studentId: number, res: Response) {
        const clients = this.studentClients.get(studentId);
        if (clients) {
            this.studentClients.set(
                studentId,
                clients.filter((client) => client !== res)
            );
        }
    }
}
