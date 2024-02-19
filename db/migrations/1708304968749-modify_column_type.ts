import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnType1708304968749 implements MigrationInterface {
    name = 'ModifyColumnType1708304968749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_programs" DROP COLUMN "is_first_purchase"`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ADD "is_first_purchase" boolean NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" DROP COLUMN "is_transactional_combine"`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ADD "is_transactional_combine" boolean NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_programs" DROP COLUMN "is_transactional_combine"`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ADD "is_transactional_combine" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" DROP COLUMN "is_first_purchase"`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ADD "is_first_purchase" integer NOT NULL DEFAULT '0'`);
    }

}
