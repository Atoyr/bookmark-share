alter table "public"."tag_definitions" add column "color" text not null;

create policy "Enable insert for authenticated users only"
on "public"."bookmarks"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."bookmarks"
as permissive
for select
to public
using (true);



