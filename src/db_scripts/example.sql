-- Adminer 4.7.7 PostgreSQL dump

DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" bigint NOT NULL,
    "username" character varying(512) NOT NULL,
    "password" character varying(164) NOT NULL,
    "email" character varying(512),
    "number" character varying(32),
    "max_token_count" integer DEFAULT '1' NOT NULL,
    "enabled" boolean DEFAULT false,
    "dt" timestamptz DEFAULT now() NOT NULL,
    "dtu" timestamptz DEFAULT now(),
    "enc_salt" character(32) NOT NULL,
    "reg_id" character varying(164),
    "device_id" bigint,
    "device_type" character varying(164)
) WITH (oids = false);

INSERT INTO "users" ("id", "username", "password", "email", "number", "max_token_count", "enabled", "dt", "dtu", "enc_salt", "reg_id", "device_id", "device_type") VALUES
(1,	'admin',	'9a39873216cdf7860561aff39460abb294260fa3d513a81ee3918b754d7ad628',	'dummy@fastify.ftw',	'03312737076',	2,	't',	'2020-03-12 15:18:31.787547+05',	'2020-03-12 15:18:31.787547+05',	'055178eb2cd1168710d9dbcf474e12b2',	'1',	NULL,	NULL),
(3,	'salman',	'002864c4302bc7129699e2d5f68b381ee97ff9702d0fd1e0b88ba96ac1a38c77',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 10:55:41.52637+05',	'2020-03-30 10:55:41.52637+05',	'ba3daa8e711da872ac513725bffdc469',	'1',	NULL,	NULL),
(4,	'salman',	'320cb68297cf50057857807881cbdf0ed06c95fad5e69d93d564ac5aea7b80b2',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 10:56:18.350068+05',	'2020-03-30 10:56:18.350068+05',	'bc5b46852efbb142baa4a1e0eb763993',	'1',	NULL,	NULL),
(5,	'salman',	'360de72eef14f5df717a7b174e25eceab8a33b5b05d7c520b7cc13c63edbec2a',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 11:08:09.450363+05',	'2020-03-30 11:08:09.450363+05',	'747d12839aa26cb9e420c6f9dff6e543',	'1',	NULL,	NULL),
(6,	'test',	'948a1eb79989289c63169b89c36c11936c24a2b5415b0be52c684be82c11ba7b',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 11:10:55.608068+05',	'2020-03-30 11:10:55.608068+05',	'1d93004ed29be525710f79c8dcb3ffac',	'1',	NULL,	NULL),
(7,	'test',	'd5f30bef9fc05c974f01aa898d6b16f89de048905fb945c52fef583ac0696632',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 11:31:35.417434+05',	'2020-03-30 11:31:35.417434+05',	'bba55e7e3320b596d7710ba5e31fa7d9',	'1',	NULL,	NULL),
(8,	'test',	'7fafa2c28c2e7cc4b752699cffc912b6f63f9587c19c4386fc47459e9c0ccda8',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 11:32:28.082194+05',	'2020-03-30 11:32:28.082194+05',	'7f27837e95201cead4dad1c683aedba7',	'1',	NULL,	NULL),
(9,	'test',	'5e7ae46a7f159c8f70e534d918098944f9b2b915339098e744ab99b75d280f70',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 11:47:39.741709+05',	'2020-03-30 11:47:39.741709+05',	'bcdfd4903981215a98aa62f84d066b31',	'1',	NULL,	NULL),
(10,	'test',	'22863ffe2c43b8c409fb8edbd679aeede19b9ee4479557521c801b1145aa6359',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 12:00:41.439531+05',	'2020-03-30 12:00:41.439531+05',	'1957baf5d421dbdd1ad755bfd1159a4d',	'1',	NULL,	NULL),
(2,	'mushtaq',	'cf413089f30b6dc0d1f6462a059351afb5d283d7c9c032c63f6f137f4a1f6cbc',	'dummy@fastify.ftw',	'03463312526',	1,	't',	'2020-03-12 15:18:31.787547+05',	'2020-03-30 12:03:05.235948+05',	'055178eb2cd1168710d9dbcf474e12b2',	'1',	NULL,	NULL),
(11,	'test',	'3727d131d1e8ca127e6ea0a5652b3af3b84ae90190622074b7c1e4d8a0ae2657',	'dummy@fastify.ftw',	'03463312526',	1,	'f',	'2020-03-30 13:47:19.658915+05',	'2020-03-30 13:47:19.658915+05',	'95e19db6f9ae5abaa1bf62b2ea3cf67c',	'1',	NULL,	NULL);

-- 2020-08-19 00:00:02.737668+05
