import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.body;

    const listMonthAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await listMonthAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });

    return res.json(dayAvailability);
  }
}
