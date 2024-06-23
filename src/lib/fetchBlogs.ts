// lib/fetchBlogs.ts
export interface Author {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    image: {
      sys: {
        id: string;
      };
    };
  };
}

export interface Asset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    };
  };
}

export interface Blog {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    shortDescription: string;
    createdBy: {
      sys: {
        id: string;
      };
    };
    createdAt: string;
  };
}

export interface BlogsData {
  items: Blog[];
  includes: {
    Entry: Author[];
    Asset: Asset[];
  };
}

export const getBlogs = async (): Promise<BlogsData> => {
  const url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`;
  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: BlogsData = await response.json();
  return data;
};
