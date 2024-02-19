import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnLoyaltyProgramIdToNullable1708376188996 implements MigrationInterface {
    name = 'ModifyColumnLoyaltyProgramIdToNullable1708376188996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ALTER COLUMN "is_first_purchase" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ALTER COLUMN "is_transactional_combine" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "point_histories" DROP CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9"`);
        await queryRunner.query(`ALTER TABLE "point_histories" ALTER COLUMN "loyalty_program_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point_histories" ADD CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point_histories" DROP CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9"`);
        await queryRunner.query(`ALTER TABLE "point_histories" ALTER COLUMN "loyalty_program_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point_histories" ADD CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ALTER COLUMN "is_transactional_combine" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "loyalty_programs" ALTER COLUMN "is_first_purchase" SET DEFAULT false`);
    }

}
