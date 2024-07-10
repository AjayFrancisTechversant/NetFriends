import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class users extends Model {
  static table = 'users';

  @field('name') name;
  @field('age') age;
  @field('gender') gender;
  @field('email') email;
  @field('phone') phone;
}
