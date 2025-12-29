create policy "Enable insert for authenticated users only"
on "public"."tag_definitions"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) IN ( SELECT su.uid
   FROM space_users su
  WHERE (su.space_id = su.space_id))));


create policy "Enable read access for all users"
on "public"."tag_definitions"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) IN ( SELECT su.uid
   FROM space_users su
  WHERE (su.space_id = su.space_id))));



