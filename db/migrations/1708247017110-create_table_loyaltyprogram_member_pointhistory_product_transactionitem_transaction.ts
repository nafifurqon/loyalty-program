import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLoyaltyprogramMemberPointhistoryProductTransactionitemTransaction1708247017110
  implements MigrationInterface
{
  name =
    'CreateTableLoyaltyprogramMemberPointhistoryProductTransactionitemTransaction1708247017110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."loyalty_programs_type_enum" AS ENUM('transactional', 'community')`,
    );
    await queryRunner.query(
      `CREATE TABLE "loyalty_programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."loyalty_programs_type_enum" NOT NULL DEFAULT 'transactional', "transaction_amount" integer NOT NULL DEFAULT '0', "quantity" integer NOT NULL DEFAULT '0', "is_first_purchase" integer NOT NULL DEFAULT '0', "is_transactional_combine" integer NOT NULL DEFAULT '0', "percentage_benefit" integer NOT NULL DEFAULT '0', "fixed_point_benefit" integer NOT NULL DEFAULT '0', "start_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9911f010986d7730cc744f91ff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."members_status_enum" AS ENUM('1', '0')`,
    );
    await queryRunner.query(
      `CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "birth_date" date NOT NULL DEFAULT now(), "address" character varying NOT NULL, "referal_code" character varying NOT NULL, "balance_point" integer NOT NULL DEFAULT '0', "status" "public"."members_status_enum" NOT NULL DEFAULT '1', "tier_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tierId" uuid, CONSTRAINT "UQ_2714af51e3f7dd42cf66eeb08d6" UNIQUE ("email"), CONSTRAINT "UQ_6d0eda11081c30a41963bf4c2b1" UNIQUE ("phone_number"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "member_id" character varying NOT NULL, "total_amount_primary" integer NOT NULL DEFAULT '0', "total_amount" integer NOT NULL DEFAULT '0', "redeemed_point" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "memberId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_id" character varying NOT NULL, "Product_id" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "quantity" integer NOT NULL DEFAULT '0', "subtotal" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transactionId" uuid, "productId" uuid, CONSTRAINT "PK_ff5a487ad820dccafd53bebf578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "point_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "member_id" character varying NOT NULL, "transaction_id" character varying NOT NULL, "loyalty_program_id" character varying NOT NULL, "earned_point" integer NOT NULL DEFAULT '0', "redeemed_point" integer NOT NULL DEFAULT '0', "existing_point" integer NOT NULL DEFAULT '0', "balance_point" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "memberId" uuid, "transactionId" uuid, "loyaltyProgramId" uuid, CONSTRAINT "PK_e01b99df91c8b4e471723fbe8bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiers_loyalty_programs_loyalty_programs" ("tier_id" uuid NOT NULL, "loyalty_program_id" uuid NOT NULL, CONSTRAINT "PK_16a1a43bc70b2c6cda3f74ba320" PRIMARY KEY ("tier_id", "loyalty_program_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d7032099699003f40648d88e86" ON "tiers_loyalty_programs_loyalty_programs" ("tier_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6374e2bf3605417dddafeb8d5e" ON "tiers_loyalty_programs_loyalty_programs" ("loyalty_program_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_749838686d54572e2beac4709c7" FOREIGN KEY ("tierId") REFERENCES "tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_34aa3fc18ecdd334edca12997ff" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_d5161da0e36c1e674e73839a09e" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" ADD CONSTRAINT "FK_ab13bc083569852c5247b41f2b8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_889610abde1f76a2dfad5503f4f" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_9a40deca3402cbcc2181bca423c" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" ADD CONSTRAINT "FK_a48c52b2738a80bc976ff7dcba2" FOREIGN KEY ("loyaltyProgramId") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiers_loyalty_programs_loyalty_programs" ADD CONSTRAINT "FK_d7032099699003f40648d88e861" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiers_loyalty_programs_loyalty_programs" ADD CONSTRAINT "FK_6374e2bf3605417dddafeb8d5eb" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tiers_loyalty_programs_loyalty_programs" DROP CONSTRAINT "FK_6374e2bf3605417dddafeb8d5eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiers_loyalty_programs_loyalty_programs" DROP CONSTRAINT "FK_d7032099699003f40648d88e861"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_a48c52b2738a80bc976ff7dcba2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_9a40deca3402cbcc2181bca423c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_histories" DROP CONSTRAINT "FK_889610abde1f76a2dfad5503f4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_ab13bc083569852c5247b41f2b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_items" DROP CONSTRAINT "FK_d5161da0e36c1e674e73839a09e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_34aa3fc18ecdd334edca12997ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_749838686d54572e2beac4709c7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6374e2bf3605417dddafeb8d5e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d7032099699003f40648d88e86"`,
    );
    await queryRunner.query(
      `DROP TABLE "tiers_loyalty_programs_loyalty_programs"`,
    );
    await queryRunner.query(`DROP TABLE "point_histories"`);
    await queryRunner.query(`DROP TABLE "transaction_items"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "members"`);
    await queryRunner.query(`DROP TYPE "public"."members_status_enum"`);
    await queryRunner.query(`DROP TABLE "loyalty_programs"`);
    await queryRunner.query(`DROP TYPE "public"."loyalty_programs_type_enum"`);
  }
}
