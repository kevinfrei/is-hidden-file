cmake_minimum_required(VERSION 3.10)

project(is-win32-hidden)

include_directories(${CMAKE_JS_INC})
add_library(
  is-win32-hidden
  SHARED
  src/module.cc
  ${CMAKE_JS_SRC}
)
set_target_properties(is-win32-hidden PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(is-win32-hidden ${CMAKE_JS_LIB})
# execute_process(COMMAND echo link /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
