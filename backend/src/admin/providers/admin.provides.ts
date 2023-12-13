import { Connection } from 'mongoose';
import { adminSchema } from '../schema/admin.schema';

export const adminProviders = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', adminSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];