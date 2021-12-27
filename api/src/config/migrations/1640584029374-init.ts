import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1640584029374 implements MigrationInterface {
  name = 'init1640584029374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "code" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "description" text NOT NULL, "start_date" datetime NOT NULL, "end_date" datetime NOT NULL, "duration" integer NOT NULL, "organized_by" varchar NOT NULL, "location" text NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "code" varchar NOT NULL, "expiration" datetime NOT NULL, "quantity" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_category" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "code" varchar NOT NULL, "categoryId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" text NOT NULL, "blocked" boolean NOT NULL DEFAULT (0), "confirmed" boolean NOT NULL DEFAULT (0), "contact_no" text, "country_code" smallint DEFAULT (91), "reset_password_token" text, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sub_category" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "code" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sub_category"("id", "deleted", "created_at", "updated_at", "name", "code", "categoryId") SELECT "id", "deleted", "created_at", "updated_at", "name", "code", "categoryId" FROM "sub_category"`,
    );
    await queryRunner.query(`DROP TABLE "sub_category"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sub_category" RENAME TO "sub_category"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_category" RENAME TO "temporary_sub_category"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_category" ("id" varchar PRIMARY KEY NOT NULL, "deleted" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "code" varchar NOT NULL, "categoryId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "sub_category"("id", "deleted", "created_at", "updated_at", "name", "code", "categoryId") SELECT "id", "deleted", "created_at", "updated_at", "name", "code", "categoryId" FROM "temporary_sub_category"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sub_category"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "sub_category"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
