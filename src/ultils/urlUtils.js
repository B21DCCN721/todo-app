const updateQueryParams = (params) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  window.history.pushState({}, "", url);
};
// Cập nhật nhiều query cùng lúc: ?name=John&age=25&city=NewYork
// updateQueryParams({ name: "John", age: "25", city: "NewYork" });

export { updateQueryParams };
