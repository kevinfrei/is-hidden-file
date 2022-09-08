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
add_custom_target(copy-command ALL
  COMMAND
  ${CMAKE_COMMAND} -E 
  make_directory ${CMAKE_CURRENT_SOURCE_DIR}/lib
  COMMAND
  ${CMAKE_COMMAND} -E
  copy ${CMAKE_CURRENT_BINARY_DIR}/Release/is-win32-hidden.node ${CMAKE_CURRENT_SOURCE_DIR}/lib/
  DEPENDS is-win32-hidden
)