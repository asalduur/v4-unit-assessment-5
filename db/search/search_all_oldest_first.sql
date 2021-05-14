select p.post_id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.user_id = p.author_id
where lower(title) like $1
order by date_created asc;