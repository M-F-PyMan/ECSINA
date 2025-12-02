from django.core.cache import cache

def get_related_educations_cache_key(user_id, category_id):
    return f"related_educations_{user_id}_{category_id}"

def get_cached_related_educations(user_id, category_id):
    key = get_related_educations_cache_key(user_id, category_id)
    return cache.get(key)

def set_cached_related_educations(user_id, category_id, data, timeout=300):
    key = get_related_educations_cache_key(user_id, category_id)
    cache.set(key, data, timeout)

def invalidate_related_educations_cache(user_id, category_id):
    key = get_related_educations_cache_key(user_id, category_id)
    cache.delete(key)
