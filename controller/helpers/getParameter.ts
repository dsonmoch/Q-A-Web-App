const getParameter = (userInput: any) => {
  const title = userInput.title;
  const tags = userInput.tags;
  const items = parseInt(userInput.items);
  const page = parseInt(userInput.page) * 2;
  var params;

  if (!title && !tags) {
    params = [items, page];
    console.log(params);
    return params;
  }
  if (!title) {
    const front = "%" + tags;
    const back = tags + "%";
    const middle = "%" + tags + "%";
    params = [front, middle, back, items, page];
    console.log(params);
    return params;
  }

  if (!tags) {
    const front = "%" + title;
    const back = title + "%";
    const middle = "%" + title + "%";
    params = [front, middle, back, items, page];
    console.log(params);
    return params;
  }

  if (tags && title) {
    const titleFront = "%" + title;
    const titleBack = title + "%";
    const titleMiddle = "%" + title + "%";
    const tagsFront = "%" + tags;
    const tagsBack = tags + "%";
    const tagsMiddle = "%" + tags + "%";
    params = [
      titleFront,
      titleMiddle,
      titleBack,
      tagsFront,
      tagsMiddle,
      tagsBack,
      items,
      page,
    ];
    console.log(params);
    return params;
  }
};

export default getParameter;
