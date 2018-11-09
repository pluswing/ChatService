import { User } from './User';
import { Operator } from './Operator';

export class Responsible {
    userId: number;
    operatorId: number;

    constructor(user: User, operator: Operator) {
        this.userId = user.id;
        this.operatorId = operator.id;
    }
}

export interface ResponsibleRepository {
    associate(responsible: Responsible): void;
    findByOperator(operator: Operator): Responsible[];
}

class ResponsibleMemory implements ResponsibleRepository {
    private responsibles: {[key: number]: Responsible[]} = {};

    associate(responsible: Responsible): void {

        // remove userId
        Object.keys(this.responsibles).forEach((operatorId) => {
            const id = parseInt(operatorId, 10);
            this.responsibles[id] = this.responsibles[id].filter((r) => {
                return r.userId !== responsible.userId;
            });
        });

        if (!this.responsibles[responsible.operatorId]) {
            this.responsibles[responsible.operatorId] = [];
        }
        this.responsibles[responsible.operatorId].push(responsible);
    }

    findByOperator(operator: Operator): Responsible[] {
        return this.responsibles[operator.id] || [];
    }
}

export const responsibles : ResponsibleRepository = new ResponsibleMemory();
