from django.db import migrations

def create_default_roles_permissions(apps, schema_editor):
    Role = apps.get_model('permissions', 'Role')
    Permission = apps.get_model('permissions', 'Permission')
    RoleHasPermission = apps.get_model('permissions', 'RoleHasPermission')

    # تعریف مجوزها
    permissions = [
        {'code': 'can_reply_to_proposals', 'name': 'Reply to Proposals', 'label': 'پاسخ‌دهی به پروپوزال'},
        {'code': 'can_delete_proposals', 'name': 'Delete Proposals', 'label': 'حذف پروپوزال'},
        {'code': 'can_delete_comments', 'name': 'Delete Comments', 'label': 'حذف کامنت'},
    ]
    permission_objs = {}
    for perm in permissions:
        obj, _ = Permission.objects.get_or_create(code=perm['code'], defaults={
            'name': perm['name'],
            'label': perm['label']
        })
        permission_objs[perm['code']] = obj

    # تعریف نقش‌ها
    roles = [
        {'name': 'owner', 'label': 'مالک سایت', 'permissions': ['can_reply_to_proposals', 'can_delete_proposals', 'can_delete_comments']},
        {'name': 'admin', 'label': 'ادمین', 'permissions': ['can_delete_proposals', 'can_delete_comments']},
        {'name': 'consultant', 'label': 'مشاور', 'permissions': ['can_reply_to_proposals']},
        {'name': 'member', 'label': 'کاربر عادی', 'permissions': []},
    ]
    for role in roles:
        role_obj, _ = Role.objects.get_or_create(name=role['name'], defaults={'label': role['label']})
        for perm_code in role['permissions']:
            RoleHasPermission.objects.get_or_create(role=role_obj, permission=permission_objs[perm_code])

class Migration(migrations.Migration):

    dependencies = [
        ('permissions', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_roles_permissions),
    ]
