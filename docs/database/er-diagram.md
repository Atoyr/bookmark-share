# データベース ER図

## ER図

```mermaid
---
title: bookmark-share
---
erDiagram
    spaces ||--|{ bookmarks : スペースに所属するブックマーク
    bookmark_tags }o--||tag_definitions : タグ情報
    spaces ||--|{ tag_definitions : スペースが持つタグ
    bookmarks ||--o{ bookmark_tags : ブックマークに紐付くタグ


    spaces {
        uuid id PK
        string name
        datetime created_at
        datetime modified_at
        datetime deleted_at
    }

    bookmarks {
        uuid id PK
        uuid space_id FK
        string title
        string url
        datetime created_at
        datetime modified_at
        datetime deleted_at
    }

    bookmark_tags {
        uuid id PK
        uuid bookmark_id FK
        uuid tag_definition_id FK
        datetime created_at
    }

    tag_definitions {
        uuid id PK
        uuid space_id FK
        string name
        datetime created_at
        datetime modified_at
        datetime deleted_at
    }
```
