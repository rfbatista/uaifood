#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE docker;
	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

	create table if not exists "restaurant"
	(
		id uuid not null,
		name varchar,
    culinary varchar not null,
    city varchar,
    local json,
    document tsvector,
    document_with_idx tsvector,
    document_with_weights tsvector,
		created_at TIMESTAMP NOT NULL DEFAULT now(),
		updated_at TIMESTAMP NOT NULL DEFAULT now(),
		deleted_at TIMESTAMP,
		constraint restaurant_pkey
			primary key (id)
	);

  create table if not exists "item"
	(
		id uuid not null,
		name varchar,
    price json,
    restaurant_id uuid,
		created_at TIMESTAMP NOT NULL DEFAULT now(),
		updated_at TIMESTAMP NOT NULL DEFAULT now(),
		deleted_at TIMESTAMP,
		constraint item_pkey
			primary key (id),
    constraint restaurant_id_fkey
		  foreign key (restaurant_id) references "restaurant"
	);

  update restaurant
  set document_with_weights = setweight(to_tsvector(coalesce(city, '')), 'A') || setweight(to_tsvector(coalesce(culinary, '')), 'B');

  CREATE INDEX document_weights_idx
  ON restaurant
  USING GIN (document_with_weights);

  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('ab417b62-5354-458e-9228-9694b2c5101f', 'japao', 'Japonesa', 'Piracicaba', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:33:55.572704', '2022-04-30 01:33:55.572704', null);
  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('cc444d4f-5bc5-4253-9a28-20e7d71ac7f3', 'japao', 'Japonesa', 'Sao Paulo', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:34:04.321598', '2022-04-30 01:34:04.321598', null);
  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('2e94d63b-83ce-415e-81d3-9afc0e9fab9b', 'Italia', 'Italiana', 'Piracicaba', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:34:15.359547', '2022-04-30 01:34:15.359547', null);
  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('bb7459f4-8252-45cc-b274-eeb21c3aece0', 'Italia', 'Italiana', 'Santa Barbara', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:34:26.889201', '2022-04-30 01:34:26.889201', null);
  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('c1d8c960-b32f-4b96-a2b9-2f99c7687c41', 'Italia', 'Italiana', 'Santa Barbara', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:35:46.916704', '2022-04-30 01:35:46.916704', null);
  INSERT INTO public.restaurant (id, name, culinary, city, local, document, document_with_idx, document_with_weights, created_at, updated_at, deleted_at) VALUES ('8e73c8d6-acc8-45bc-abbd-7a8bb8f19619', 'Italia', 'Italiana', 'Santa Barbara', '{"type":"Point","coordinates":[22.4432342,10.000023]}', null, null, null, '2022-04-30 01:53:16.633446', '2022-04-30 01:53:16.633446', null);

  INSERT INTO public.item (id, name, price, restaurant_id, created_at, updated_at, deleted_at) VALUES ('ab417b62-5354-458e-9228-9694b2c5101f', null, null, 'ab417b62-5354-458e-9228-9694b2c5101f', '2022-04-29 23:06:02.000000', '2022-04-29 23:06:00.000000', null);
  INSERT INTO public.item (id, name, price, restaurant_id, created_at, updated_at, deleted_at) VALUES ('2e94d63b-83ce-415e-81d3-9afc0e9fab9b', null, null, 'ab417b62-5354-458e-9228-9694b2c5101f', '2022-04-29 23:06:37.000000', '2022-04-29 23:06:38.000000', null);
  INSERT INTO public.item (id, name, price, restaurant_id, created_at, updated_at, deleted_at) VALUES ('ac4bdd42-094d-47bb-a08d-8d087a34994a', 'Lanche', '{"amount":29,"currency":"brl"}', 'ab417b62-5354-458e-9228-9694b2c5101f', '2022-04-30 02:10:09.861245', '2022-04-30 02:10:09.861245', null);
  INSERT INTO public.item (id, name, price, restaurant_id, created_at, updated_at, deleted_at) VALUES ('8861693d-dc86-4059-8fef-6553fd014808', 'Lanche', '{"amount":29,"currency":"brl"}', 'ab417b62-5354-458e-9228-9694b2c5101f', '2022-04-30 02:10:19.237317', '2022-04-30 02:10:19.237317', null);

EOSQL
