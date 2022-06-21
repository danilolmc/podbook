import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1655162421247 implements MigrationInterface {
    name = 'CreateTables1655162421247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`podbook_category\` (\`cat_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`cat_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`podbook\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bannerImage\` varchar(255) NOT NULL, \`bannerTitle\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`audio\` varchar(255) NOT NULL, \`categoryCatId\` int NULL, \`userOwnerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`photo\` varchar(255) NOT NULL, \`bio\` varchar(255) NOT NULL, \`backgroundPhoto\` varchar(255) NOT NULL, \`userOwnerId\` int NULL, UNIQUE INDEX \`REL_29a54858bc071f70f4c80b404b\` (\`userOwnerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`podbook\` ADD CONSTRAINT \`FK_131d29f0231f7f64ec3f32a9ee8\` FOREIGN KEY (\`categoryCatId\`) REFERENCES \`podbook_category\`(\`cat_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`podbook\` ADD CONSTRAINT \`FK_1ad3af3bcfc9392a9c1b41963d3\` FOREIGN KEY (\`userOwnerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_29a54858bc071f70f4c80b404b6\` FOREIGN KEY (\`userOwnerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_29a54858bc071f70f4c80b404b6\``);
        await queryRunner.query(`ALTER TABLE \`podbook\` DROP FOREIGN KEY \`FK_1ad3af3bcfc9392a9c1b41963d3\``);
        await queryRunner.query(`ALTER TABLE \`podbook\` DROP FOREIGN KEY \`FK_131d29f0231f7f64ec3f32a9ee8\``);
        await queryRunner.query(`DROP INDEX \`REL_29a54858bc071f70f4c80b404b\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`podbook\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`podbook_category\``);
    }

}
