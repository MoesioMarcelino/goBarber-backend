import { getMongoRepository, MongoRepository } from 'typeorm';

import NotificationsRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements NotificationsRepositoryInterface {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
