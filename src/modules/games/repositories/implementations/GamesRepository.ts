import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    return await this.repository
    .createQueryBuilder("games")
    .where("games.title ILIKE :param", {param: `%${param}%`})
    .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT count(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    return await this.repository
    .createQueryBuilder("games")
    .innerJoinAndSelect("games.users", "user")
    .where("games.id = :id",{ id : id })
    .select([
      "user.id as id", 
      "first_name", 
      "last_name", 
      "email", 
      "user.created_at as created_at", 
      "user.updated_at as updated_at"
    ])
    .getRawMany();
      // Complete usando query builder
  }
}
