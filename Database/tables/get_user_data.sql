-- DROP FUNCTION app.get_user_data(varchar);

CREATE OR REPLACE FUNCTION app.get_user_data(useremail character varying)
 RETURNS TABLE(org_id integer, user_id integer, template_data character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
        SELECT u.org_id, u.user_id, t.template_data
        FROM maindb.app.users u
        LEFT JOIN maindb.app.templates t ON t.owner_user_id = u.user_id
        WHERE u.email = userEmail;
END;
$function$
;
