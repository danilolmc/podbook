import {MigrationInterface, QueryRunner} from "typeorm";

export class createPodbook1634269387259 implements MigrationInterface {
    name = 'createPodbook1634269387259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`podbook\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bannerImage\` varchar(255) NOT NULL, \`bannerTitle\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`podbook\``);
    }

}
