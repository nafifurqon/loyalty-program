import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTableForLoyaltyProgramAndTierRelationship1708301969352 implements MigrationInterface {
    name = 'CreateNewTableForLoyaltyProgramAndTierRelationship1708301969352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loyalty_program_tiers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tier_id" uuid NOT NULL, "loyalty_program_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7dc8563f179cc89876d5ae4752a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" ADD CONSTRAINT "FK_a2bf6501cd52ee8d2e5e01fbe1b" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" ADD CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_program_tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" DROP CONSTRAINT "FK_0657e69c78ad68e57e4fcff1010"`);
        await queryRunner.query(`ALTER TABLE "loyalty_program_tiers" DROP CONSTRAINT "FK_a2bf6501cd52ee8d2e5e01fbe1b"`);
        await queryRunner.query(`DROP TABLE "loyalty_program_tiers"`);
    }

}
