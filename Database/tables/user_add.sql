-- PROCEDURE: app.p_user_add_edit(character varying, character varying, character varying, integer, integer)

-- DROP PROCEDURE IF EXISTS app.p_user_add_edit(character varying, character varying, character varying, integer, integer);

CREATE OR REPLACE PROCEDURE app.p_user_add_edit(
	IN first_name character varying,
	IN last_name character varying,
	IN email character varying,
	IN org_id integer,
	IN user_id integer DEFAULT NULL::integer)
LANGUAGE 'sql'
AS $BODY$
IF user_id IS NULL THEN
	IF EXISTS (SELECT * FROM app.users WHERE org_id=org_id and email=email) then raise error
	INSERT INTO app.users(...)
	VALUES(first_name)
	-- output new user id
ELSE
	update app.users
	SET first_name=first_name
	WHERE user_id=user_id
	
END IF;
$BODY$;
ALTER PROCEDURE app.p_user_add_edit(character varying, character varying, character varying, integer, integer)
    OWNER TO postgres;
