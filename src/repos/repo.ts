export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  getById(_id: X['id']): Promise<X>;
  // eslint-disable-next-line no-unused-vars
  search({ key, value }: { key: keyof X; value: unknown }): Promise<X[]>;
  create(_newItem: Omit<X, 'id'>): Promise<X>;
  update(_id: X['id'], _updatedItem: Partial<X>): Promise<X>;
  delete(_id: X['id']): Promise<void>;

  addFriend(_friendId: X['id'], _userId: X['id']): Promise<X>;
  addEnemy(_enemyId: X['id'], _userId: X['id']): Promise<X>;
  removeFriend(_id: X['id'], _friendIdToRemove: X['id']): Promise<X>;
  removeEnemy(_id: X['id'], _enemyIdToRemove: X['id']): Promise<X>;
}
