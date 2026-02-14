-- 既存ポリシーを削除
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."bookmarks";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."bookmarks";

-- SELECT: スペースメンバーのみ閲覧可能
CREATE POLICY "Space members can read bookmarks"
ON "public"."bookmarks"
FOR SELECT
TO authenticated
USING (
    auth.uid() IN (
        SELECT su.uid FROM space_users su WHERE su.space_id = bookmarks.space_id
    )
);

-- INSERT: スペースメンバーのみ作成可能
CREATE POLICY "Space members can create bookmarks"
ON "public"."bookmarks"
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() IN (
        SELECT su.uid FROM space_users su WHERE su.space_id = bookmarks.space_id
    )
);

-- UPDATE: スペースメンバーのみ更新可能
CREATE POLICY "Space members can update bookmarks"
ON "public"."bookmarks"
FOR UPDATE
TO authenticated
USING (
    auth.uid() IN (
        SELECT su.uid FROM space_users su WHERE su.space_id = bookmarks.space_id
    )
)
WITH CHECK (
    auth.uid() IN (
        SELECT su.uid FROM space_users su WHERE su.space_id = bookmarks.space_id
    )
);

-- DELETE: スペースメンバーのみ削除可能
CREATE POLICY "Space members can delete bookmarks"
ON "public"."bookmarks"
FOR DELETE
TO authenticated
USING (
    auth.uid() IN (
        SELECT su.uid FROM space_users su WHERE su.space_id = bookmarks.space_id
    )
);
