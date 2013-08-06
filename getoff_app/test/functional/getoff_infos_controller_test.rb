require 'test_helper'

class GetoffInfosControllerTest < ActionController::TestCase
  setup do
    @getoff_info = getoff_infos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:getoff_infos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create getoff_info" do
    assert_difference('GetoffInfo.count') do
      post :create, :getoff_info => { :hint => @getoff_info.hint, :number => @getoff_info.number, :station_id => @getoff_info.station_id, :time => @getoff_info.time, :user_id => @getoff_info.user_id }
    end

    assert_redirected_to getoff_info_path(assigns(:getoff_info))
  end

  test "should show getoff_info" do
    get :show, :id => @getoff_info
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @getoff_info
    assert_response :success
  end

  test "should update getoff_info" do
    put :update, :id => @getoff_info, :getoff_info => { :hint => @getoff_info.hint, :number => @getoff_info.number, :station_id => @getoff_info.station_id, :time => @getoff_info.time, :user_id => @getoff_info.user_id }
    assert_redirected_to getoff_info_path(assigns(:getoff_info))
  end

  test "should destroy getoff_info" do
    assert_difference('GetoffInfo.count', -1) do
      delete :destroy, :id => @getoff_info
    end

    assert_redirected_to getoff_infos_path
  end
end
