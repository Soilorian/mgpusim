// Code generated by MockGen. DO NOT EDIT.
// Source: gitlab.com/akita/mgpusim/v2/driver/internal (interfaces: MemoryAllocator)

package driver

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	vm "gitlab.com/akita/mem/v3/vm"
	internal "gitlab.com/akita/mgpusim/v2/driver/internal"
)

// MockMemoryAllocator is a mock of MemoryAllocator interface.
type MockMemoryAllocator struct {
	ctrl     *gomock.Controller
	recorder *MockMemoryAllocatorMockRecorder
}

// MockMemoryAllocatorMockRecorder is the mock recorder for MockMemoryAllocator.
type MockMemoryAllocatorMockRecorder struct {
	mock *MockMemoryAllocator
}

// NewMockMemoryAllocator creates a new mock instance.
func NewMockMemoryAllocator(ctrl *gomock.Controller) *MockMemoryAllocator {
	mock := &MockMemoryAllocator{ctrl: ctrl}
	mock.recorder = &MockMemoryAllocatorMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockMemoryAllocator) EXPECT() *MockMemoryAllocatorMockRecorder {
	return m.recorder
}

// Allocate mocks base method.
func (m *MockMemoryAllocator) Allocate(arg0 vm.PID, arg1 uint64, arg2 int) uint64 {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Allocate", arg0, arg1, arg2)
	ret0, _ := ret[0].(uint64)
	return ret0
}

// Allocate indicates an expected call of Allocate.
func (mr *MockMemoryAllocatorMockRecorder) Allocate(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Allocate", reflect.TypeOf((*MockMemoryAllocator)(nil).Allocate), arg0, arg1, arg2)
}

// AllocatePageWithGivenVAddr mocks base method.
func (m *MockMemoryAllocator) AllocatePageWithGivenVAddr(arg0 vm.PID, arg1 int, arg2 uint64, arg3 bool) vm.Page {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AllocatePageWithGivenVAddr", arg0, arg1, arg2, arg3)
	ret0, _ := ret[0].(vm.Page)
	return ret0
}

// AllocatePageWithGivenVAddr indicates an expected call of AllocatePageWithGivenVAddr.
func (mr *MockMemoryAllocatorMockRecorder) AllocatePageWithGivenVAddr(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AllocatePageWithGivenVAddr", reflect.TypeOf((*MockMemoryAllocator)(nil).AllocatePageWithGivenVAddr), arg0, arg1, arg2, arg3)
}

// AllocateUnified mocks base method.
func (m *MockMemoryAllocator) AllocateUnified(arg0 vm.PID, arg1 uint64) uint64 {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AllocateUnified", arg0, arg1)
	ret0, _ := ret[0].(uint64)
	return ret0
}

// AllocateUnified indicates an expected call of AllocateUnified.
func (mr *MockMemoryAllocatorMockRecorder) AllocateUnified(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AllocateUnified", reflect.TypeOf((*MockMemoryAllocator)(nil).AllocateUnified), arg0, arg1)
}

// Free mocks base method.
func (m *MockMemoryAllocator) Free(arg0 uint64) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "Free", arg0)
}

// Free indicates an expected call of Free.
func (mr *MockMemoryAllocatorMockRecorder) Free(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Free", reflect.TypeOf((*MockMemoryAllocator)(nil).Free), arg0)
}

// GetDeviceIDByPAddr mocks base method.
func (m *MockMemoryAllocator) GetDeviceIDByPAddr(arg0 uint64) int {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetDeviceIDByPAddr", arg0)
	ret0, _ := ret[0].(int)
	return ret0
}

// GetDeviceIDByPAddr indicates an expected call of GetDeviceIDByPAddr.
func (mr *MockMemoryAllocatorMockRecorder) GetDeviceIDByPAddr(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetDeviceIDByPAddr", reflect.TypeOf((*MockMemoryAllocator)(nil).GetDeviceIDByPAddr), arg0)
}

// RegisterDevice mocks base method.
func (m *MockMemoryAllocator) RegisterDevice(arg0 *internal.Device) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "RegisterDevice", arg0)
}

// RegisterDevice indicates an expected call of RegisterDevice.
func (mr *MockMemoryAllocatorMockRecorder) RegisterDevice(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RegisterDevice", reflect.TypeOf((*MockMemoryAllocator)(nil).RegisterDevice), arg0)
}

// Remap mocks base method.
func (m *MockMemoryAllocator) Remap(arg0 vm.PID, arg1, arg2 uint64, arg3 int) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "Remap", arg0, arg1, arg2, arg3)
}

// Remap indicates an expected call of Remap.
func (mr *MockMemoryAllocatorMockRecorder) Remap(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Remap", reflect.TypeOf((*MockMemoryAllocator)(nil).Remap), arg0, arg1, arg2, arg3)
}

// RemovePage mocks base method.
func (m *MockMemoryAllocator) RemovePage(arg0 uint64) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "RemovePage", arg0)
}

// RemovePage indicates an expected call of RemovePage.
func (mr *MockMemoryAllocatorMockRecorder) RemovePage(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RemovePage", reflect.TypeOf((*MockMemoryAllocator)(nil).RemovePage), arg0)
}
