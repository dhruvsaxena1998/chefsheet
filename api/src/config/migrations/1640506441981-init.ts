import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1640506441981 implements MigrationInterface {
  name = 'init1640506441981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "start_date" datetime NOT NULL, "end_date" datetime NOT NULL, "duration" integer NOT NULL, "organized_by" varchar NOT NULL, "location" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" text NOT NULL, "blocked" boolean NOT NULL DEFAULT (0), "confirmed" boolean NOT NULL DEFAULT (0), "contact_no" text, "country_code" smallint DEFAULT (91), "reset_password_token" text, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
