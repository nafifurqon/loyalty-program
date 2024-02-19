import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnMaximumPointBenefitToLoyaltyProgra1708300764325 implements MigrationInterface {
    name = 'AddColumnMaximumPointBenefitToLoyaltyProgra1708300764325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ADD "maximum_point_benefit" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_programs" DROP COLUMN "maximum_point_benefit"`);
    }

}
