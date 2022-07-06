#include <node_api.h>
#include <windows.h>
using namespace std;

void throwIfNotSuccess(napi_env env, napi_status status, char *msg)
{
	if (status != napi_ok)
	{
		throw napi_throw_error(env, NULL, msg);
	}
}

bool checkHiddenFile(const char16_t *filepath)
{
	DWORD const result = GetFileAttributesW(filepath);
	if (result != 0xFFFFFFFF)
	{
		return !!(result & FILE_ATTRIBUTE_HIDDEN);
	}
	else
	{
		return false;
	}
}

napi_value isHiddenFile(napi_env env, napi_callback_info info)
{
	napi_status status;

	size_t argc = 2;
	napi_value argv[2];
	throwIfNotSuccess(env, napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr), "unable to read arguments");

	size_t str_size;
	size_t str_size_read;
	napi_get_value_string_utf16(env, argv[0], nullptr, 0, &str_size);
  str_size++;
	char16_t *path = (char16_t *)calloc(str_size, sizeof(char16_t));
	napi_get_value_string_utf16(env, argv[0], path, str_size, &str_size_read);

	napi_value result;
	status = napi_get_boolean(env, checkHiddenFile(path), &result);
  // Don't forget to free the memory...
  free(path);
	return result;
}


napi_value Init(napi_env env, napi_value exports){
	napi_value fn;
	throwIfNotSuccess(env, napi_create_function(env, "isHiddenFile", sizeof("isHiddenFile"), isHiddenFile, NULL, &fn), "Unable to wrap native function");

	throwIfNotSuccess(env, napi_set_named_property(env, exports, "isHiddenFile", fn), "Unable to populate exports");

}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)