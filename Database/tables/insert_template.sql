-- DROP PROCEDURE app.insert_template(varchar, varchar, int4, int4, int4);

CREATE OR REPLACE PROCEDURE app.insert_template(IN template_name character varying, IN template_data character varying, IN org_id integer, IN owner_user_id integer, IN elements integer)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    INSERT INTO app.templates (template_name, template_data, org_id, owner_user_id, elements)
    VALUES (template_name, template_data, org_id, owner_user_id, elements)
    RETURNING template_id;
END;
$procedure$
;
