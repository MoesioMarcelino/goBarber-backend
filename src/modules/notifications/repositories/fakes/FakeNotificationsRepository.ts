import NotificationsRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { ObjectId } from 'mongodb';

class FakeNotificationsRepository implements NotificationsRepositoryInterface {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
