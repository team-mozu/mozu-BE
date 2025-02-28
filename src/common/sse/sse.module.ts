import { Module } from '@nestjs/common';
import { SseService } from './sse.service';
import { EventClassNextInvStartForm, EventTeamInvEndForm, EventTeamPartInForm } from './event.form';

@Module({
    imports: [EventClassNextInvStartForm, EventTeamPartInForm, EventTeamInvEndForm],
    exports: [SseService, EventClassNextInvStartForm, EventTeamPartInForm, EventTeamInvEndForm],
    providers: [SseService]
})
export class SseModule {}
