import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifySomeColumnName1708287345583 implements MigrationInterface {
  name = 'ModifySomeColumnName1708287345583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_749838686d54572e2beac4709c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_34aa3fc18ecdd334edca12997ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_d5161da0e36c1e674e73839a09e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_ab13bc083569852c5247b41f2b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_889610abde1f76a2dfad5503f4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_9a40deca3402cbcc2181bca423c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_a48c52b2738a80bc976ff7dcba2"`,
    );
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "tierId"`);
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "memberId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "Product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "transactionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "memberId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "transactionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "loyaltyProgramId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "tier_id"`);
    await queryRunner.query(
      `ALTER TABLE "members" ADD "tier_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "member_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "member_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "transaction_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "member_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "member_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "transaction_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "loyalty_program_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "loyalty_program_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_e82af1287a98ffec2ec850939fa" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_674ed54e6a25f5b65770ef82592" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_5926425896b30c0d681fe879af0" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_027964fc28560d4d68a0de5ce30" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_212f1261e720e2084dc2be36538" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_58edaf1dcbc804d63d8e5bc7c34" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_7e86b2ed0f733faeac569e172e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_58edaf1dcbc804d63d8e5bc7c34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_212f1261e720e2084dc2be36538"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_027964fc28560d4d68a0de5ce30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_5926425896b30c0d681fe879af0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_674ed54e6a25f5b65770ef82592"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_e82af1287a98ffec2ec850939fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "loyalty_program_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "loyalty_program_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "transaction_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP COLUMN "member_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "member_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "transaction_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "member_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "member_id" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "tier_id"`);
    await queryRunner.query(
      `ALTER TABLE "members" ADD "tier_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "loyaltyProgramId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "transactionId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD "memberId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "productId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "transactionId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD "Product_id" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "transactions" ADD "memberId" uuid`);
    await queryRunner.query(`ALTER TABLE "members" ADD "tierId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_a48c52b2738a80bc976ff7dcba2" FOREIGN KEY ("loyaltyProgramId") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_9a40deca3402cbcc2181bca423c" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_889610abde1f76a2dfad5503f4f" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_ab13bc083569852c5247b41f2b8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_d5161da0e36c1e674e73839a09e" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_34aa3fc18ecdd334edca12997ff" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_749838686d54572e2beac4709c7" FOREIGN KEY ("tierId") REFERENCES "tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
