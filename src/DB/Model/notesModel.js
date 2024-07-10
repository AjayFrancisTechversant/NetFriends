import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export default class notes extends Model {
  static table = 'notes';

  @field('title') title;
  @field('desc') desc;
  @readonly @date('created_at') createdAt;
}
