import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyLoyaltyProgramTiers1708304168198 implements MigrationInterface {
    name = 'ModifyLoyaltyProgramTiers1708304168198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" DROP CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010"`);
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" ADD CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" DROP CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010"`);
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" ADD CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_program_tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
