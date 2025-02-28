import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TeamDomainReader } from '../team.domain.reader';
import { TeamDomainWrtier } from '../team.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { TeamDomainMapper } from './team.domain.mapper';
import { TeamDTO } from 'src/team/common/data/team.dto';
import { TeamOrderDTO } from 'src/team/common/data/team.order.dto';
import { TeamOrderEntity } from './team.order.entity';
import { HoldItemEntity } from './holdItem.entity';
import { HoldItemDTO } from 'src/team/common/data/team.holdItem.dto';
import { OrderType } from 'src/common/data/order.type';

@Injectable()
export class TeamRepository implements TeamDomainReader, TeamDomainWrtier {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly typeormRepository: Repository<TeamEntity>,
        @InjectRepository(TeamOrderEntity)
        private readonly orderTypeormRepository: Repository<TeamOrderEntity>,
        @InjectRepository(HoldItemEntity)
        private readonly holdItemTypeormRepository: Repository<HoldItemEntity>,
        private readonly mapper: TeamDomainMapper
    ) {}

    async findTeamById(teamId: number): Promise<TeamDTO> {
        const team = await this.typeormRepository.findOne({
            where: {
                id: teamId
            }
        });

        return await this.mapper.toTeamDomain(team);
    }

    async findTeamHoldItemById(teamId: number): Promise<HoldItemDTO[]> {
        const holdItems = await this.holdItemTypeormRepository.find({
            where: {
                team: {
                    id: teamId
                }
            },
            order: {
                itemId: 'ASC'
            }
        });

        return await Promise.all(
            holdItems.map((holdItem) => this.mapper.toTeamHoldItemDomain(holdItem))
        );
    }

    async findTeamOrderById(teamId: number): Promise<TeamOrderDTO[]> {
        const orders = await this.orderTypeormRepository.find({
            where: {
                team: {
                    id: teamId
                }
            },
            order: {
                id: 'ASC'
            }
        });

        return await Promise.all(orders.map((order) => this.mapper.toTeamOrderDomain(order)));
    }

    async findTeamRankById(teamId: number): Promise<TeamDTO[]> {
        const team = await this.typeormRepository.findOne({
            where: {
                id: teamId
            },
            relations: ['class']
        });

        const teams = await this.typeormRepository.find({
            where: {
                classNum: team.class.classNum
            },
            order: {
                totalMoney: 'DESC'
            }
        });

        return await Promise.all(teams.map((team) => this.mapper.toTeamDomain(team)));
    }

    async findTeamInvOrderById(teamId: number): Promise<TeamOrderDTO[]> {
        const team = await this.typeormRepository.findOne({
            where: {
                id: teamId
            },
            relations: ['class']
        });

        const orders = await this.orderTypeormRepository.find({
            where: {
                invDeg: team.invDeg - 1,
                team: {
                    id: teamId
                }
            },
            order: {
                itemId: 'ASC'
            }
        });

        return await Promise.all(orders.map((order) => this.mapper.toTeamOrderDomain(order)));
    }

    async save(teamDTO: TeamDTO, classId: number): Promise<[TeamDTO, number]> {
        const team = await this.mapper.toTeamEntity(teamDTO);

        const newTeam = await this.typeormRepository.create({
            ...team,
            class: {
                id: classId
            }
        });

        const savedTeam = await this.typeormRepository.save(newTeam);

        const findTeam = await this.typeormRepository.findOne({
            where: {
                id: savedTeam.id
            },
            relations: ['class']
        });

        return [await this.mapper.toTeamDomain(savedTeam), findTeam.class.id];
    }

    async findClassByTeamId(teamId: number): Promise<number> {
        const classEntity = await this.typeormRepository.findOne({
            where: {
                id: teamId
            },
            relations: ['class']
        });

        return classEntity.class.id;
    }

    async orderSave(teamOrderDto: TeamOrderDTO[], teamId: number): Promise<TeamOrderDTO[]> {
        const team = await this.typeormRepository.findOne({
            where: { id: teamId },
            relations: ['orders', 'class']
        });

        if (!team) {
            throw new NotFoundException(`해당하는 id(${teamId})의 참여 팀이 존재하지 않습니다.`);
        }

        if (team.invDeg !== team.class.curInvDeg) {
            throw new BadRequestException(
                `해당하는 id(${teamId})의 참여 팀은 이미 투자를 완료했습니다.`
            );
        }

        const newOrders = await Promise.all(
            teamOrderDto.map(async (order) => {
                const orderEntity = await this.mapper.toTeamOrderEntity(order);
                orderEntity.invDeg = team.class.curInvDeg;
                orderEntity.team = team;
                return orderEntity;
            })
        );

        const savedOrders = await this.orderTypeormRepository.save(newOrders);

        return await Promise.all(savedOrders.map((order) => this.mapper.toTeamOrderDomain(order)));
    }

    async holdItemSave(teamOrderDto: TeamOrderDTO, teamId: number): Promise<void> {
        const holdItem = await this.holdItemTypeormRepository.findOne({
            where: {
                itemId: teamOrderDto.itemId,
                team: { id: teamId }
            }
        });

        // 매수의 경우
        if (teamOrderDto.orderType === OrderType.BUY) {
            // 보유 중인 주식의 경우
            if (holdItem) {
                // 기존의 보유 주식을 업데이트 해야함

                // 보유 주식 정보 저장
                const totalMoney =
                    holdItem.totalMoney + teamOrderDto.itemMoney * teamOrderDto.orderCount;
                const newCount = holdItem.itemCnt + teamOrderDto.orderCount;
                holdItem.buyMoney = totalMoney / newCount;
                holdItem.itemCnt = newCount;
                holdItem.totalMoney = totalMoney;

                await this.holdItemTypeormRepository.save(holdItem);
            }
            // 새롭게 매수한 주식의 경우
            else {
                // 새롭게 보유 주식을 만들어야 함.
                const newHoldItem = new HoldItemDTO(
                    null,
                    teamOrderDto.itemId,
                    teamOrderDto.itemName,
                    teamOrderDto.orderCount,
                    teamOrderDto.itemMoney,
                    teamOrderDto.totalMoney,
                    0, // nowMoney,
                    0, // valMoney,
                    0, // valProfit,
                    0 // profitNum
                );
                const mapHoldItem = await this.mapper.toTeamHoldItemEntity(newHoldItem);
                const createHoldItem = await this.holdItemTypeormRepository.create({
                    ...mapHoldItem,
                    team: {
                        id: teamId
                    }
                });

                await this.holdItemTypeormRepository.save(createHoldItem);
            }
        }

        // 매도의 경우
        else {
            if (holdItem) {
                // 보유 중인 주식을 매도하는 경우
                holdItem.itemCnt = holdItem.itemCnt - teamOrderDto.orderCount;

                if (holdItem.itemCnt === 0) {
                    // 수량이 0인경우 -> all 매도
                    await this.holdItemTypeormRepository.remove(holdItem);
                } else {
                    holdItem.totalMoney = holdItem.buyMoney * holdItem.itemCnt;
                    await this.holdItemTypeormRepository.save(holdItem);
                }
            } else {
                throw new NotFoundException(
                    '해당 종목은 보유 중인 주식이 아니기에 매도가 불가능합니다.'
                );
            }
        }
    }

    async holdItemUpdateNow(teamId: number): Promise<HoldItemDTO[]> {
        const team = await this.typeormRepository.findOne({
            where: { id: teamId },
            relations: ['class', 'holdItems', 'class.classItems']
        });

        if (!team) {
            throw new NotFoundException(`해당하는 id(${teamId})의 참여 팀이 존재하지 않습니다.`);
        }

        const holdItems = team.holdItems;
        const teamClass = team.class;
        const classItems = team.class.classItems;

        const newHoldItems = holdItems.map((holdItem) => {
            const classItem = classItems.filter((item) => item.itemId === holdItem.itemId);
            const nowMoney = classItem[0].money[teamClass.curInvDeg];
            const valMoney = nowMoney * holdItem.itemCnt;
            const valProfit = valMoney - holdItem.totalMoney;
            const profitNum = (valProfit / holdItem.totalMoney) * 100;
            holdItem.nowMoney = nowMoney;
            holdItem.valMoney = valMoney;
            holdItem.valProfit = valProfit;
            holdItem.profitNum = profitNum;
            return holdItem;
        });

        const updateHoldItems = await this.holdItemTypeormRepository.save(newHoldItems);

        return updateHoldItems;
    }

    async teamMoneyUpdate(
        orderDTOs: TeamOrderDTO[],
        holdItemDTOs: HoldItemDTO[],
        teamId: number
    ): Promise<TeamDTO> {
        const team = await this.typeormRepository.findOne({
            where: {
                id: teamId
            }
        });
        let valueMoney: number = 0;

        await Promise.all(
            orderDTOs.map((order) => {
                if (order.orderType === OrderType.BUY) {
                    team.cashMoney -= order.totalMoney;
                } else {
                    team.cashMoney += order.totalMoney; // 매도한 금액 추가
                    console.log('매도 현금 계산 해보자', team.cashMoney);
                }
            })
        );

        await Promise.all(
            holdItemDTOs.map((holdItem) => {
                valueMoney += holdItem.valMoney;
            })
        );
        team.valueMoney = valueMoney;
        team.totalMoney = team.cashMoney + team.valueMoney;
        team.invDeg += 1;

        await this.typeormRepository.save(team);

        return await this.mapper.toTeamDomain(team);
    }
}
