import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyColumnNameOnTier1708237014763 implements MigrationInterface {
  name = 'ModifyColumnNameOnTier1708237014763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tiers" RENAME COLUMN "minmum_point" TO "minimum_point"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tiers" RENAME COLUMN "minimum_point" TO "minmum_point"`,
    );
  }
}
