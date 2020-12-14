import CreateNotificationDTO from '../dtos/CreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface NotificationsRepositoryInterface {
  create(data: CreateNotificationDTO): Promise<Notification>;
}
