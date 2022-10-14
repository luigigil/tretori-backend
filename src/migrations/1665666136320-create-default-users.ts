import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDefaultUsers1665666136320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into user (username, password, roles) VALUES
        ('dev-user@tretori.com', '$2a$12$QP8IlcvEoYOIqt/mLK.jXOOSIDSXa3aGpj2K7J3JX/ByueGdhZ.wW','user'),
        ('dev-admin@tretori.com', '$2a$12$QP8IlcvEoYOIqt/mLK.jXOOSIDSXa3aGpj2K7J3JX/ByueGdhZ.wW','admin')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from user where username in ('dev-user@tretori.com', 'dev-admin@tretori.com')`
    )
  }
}
