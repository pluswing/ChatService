import { OperatorRepository } from '../repositories/Operator';
import { Responsible, ResponsibleRepository } from '../repositories/Responsible';
import { User } from '../repositories/User';
import { UserMessage } from '../repositories/UserMessage';
import { Base } from './Base';

export class Roundrobin implements Base {
  private operatorRepository: OperatorRepository;
  private responsiveRepository: ResponsibleRepository;
  private index: number = 0;

  constructor(
    operatorRepository: OperatorRepository,
    responsiveRepository: ResponsibleRepository,
  ) {
    this.operatorRepository = operatorRepository;
    this.responsiveRepository = responsiveRepository;
    this.index = 0;
  }

  public async onMessage(user: User, message: UserMessage): Promise<void> {
    const os = await this.operatorRepository.findAll();
    const index = this.index % os.length;
    this.index = index + 1;
    const target = os[index];
    const r = new Responsible(user, target);
    this.responsiveRepository.associate(r);
  }
}
