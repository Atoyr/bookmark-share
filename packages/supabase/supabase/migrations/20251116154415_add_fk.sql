alter table "public"."users" drop column "uid";

alter table "public"."users" alter column "id" set default auth.uid();

alter table "public"."space_users" add constraint "space_users_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."space_users" validate constraint "space_users_space_id_fkey";

alter table "public"."space_users" add constraint "space_users_uid_fkey" FOREIGN KEY (uid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."space_users" validate constraint "space_users_uid_fkey";


