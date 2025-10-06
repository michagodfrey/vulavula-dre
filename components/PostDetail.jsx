import React from "react";
import moment from "moment";
import Link from "next/link";
import { Subscribe } from "./index";

const PostDetail = ({ post }) => {
  // Debug log to see post structure
  // console.log("Post data:", post);

  // Replace any Noto Emoji CDN URLs in plain text with inline <img> tags
  const replaceEmojiUrlsWithImages = (text, keyPrefix) => {
    if (typeof text !== "string") return text;

    const emojiUrlRegex =
      /(https?:\/\/fonts\.gstatic\.com\/s\/e\/notoemoji\/[^\s'"<>]+?\.png(?:\?[^\s'"<>]*)?)/gi;

    let match;
    let lastIndex = 0;
    const parts = [];

    while ((match = emojiUrlRegex.exec(text)) !== null) {
      const url = match[1];
      const preceding = text.slice(lastIndex, match.index);
      if (preceding) parts.push(preceding);

      parts.push(
        <img
          key={`${keyPrefix}-emoji-${parts.length}`}
          src={url}
          alt="emoji"
          width={20}
          height={20}
          className="inline-block align-text-bottom"
        />
      );

      lastIndex = match.index + url.length;
    }

    const trailing = text.slice(lastIndex);
    if (trailing) parts.push(trailing);

    return parts.length === 0 ? text : parts;
  };

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    // If this node has children, build fragments from them to ensure nested structures (like lists) render
    if (obj && Array.isArray(obj.children) && obj.children.length > 0) {
      modifiedText = obj.children.map((child, childIndex) =>
        getContentFragment(childIndex, child.text, child, child.type)
      );
    }

    // Convert any Noto Emoji URLs present in raw text into <img> elements
    modifiedText = replaceEmojiUrlsWithImages(modifiedText, index);

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{modifiedText}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{modifiedText}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{modifiedText}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case "emoji":
        return (
          <img
            key={index}
            alt={obj.title || "emoji"}
            height={obj.height || 20}
            width={obj.width || 20}
            src={obj.src || obj.url || (typeof text === "string" ? text : "")}
            className="inline-block align-text-bottom"
          />
        );
      case "bulleted-list":
      case "unordered-list":
        return (
          <ul key={index} className="list-disc pl-6 mb-8">
            {Array.isArray(modifiedText) ? (
              modifiedText.map((item, i) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))
            ) : (
              <li className="mb-2">{modifiedText}</li>
            )}
          </ul>
        );
      case "numbered-list":
      case "ordered-list":
        return (
          <ol key={index} className="list-decimal pl-6 mb-8">
            {Array.isArray(modifiedText) ? (
              modifiedText.map((item, i) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))
            ) : (
              <li className="mb-2">{modifiedText}</li>
            )}
          </ol>
        );
      case "list":
        // Hygraph may send a generic list node with listType: 'unordered' | 'ordered'
        if (
          obj &&
          (obj.listType === "unordered" || obj.format === "unordered")
        ) {
          return (
            <ul key={index} className="list-disc pl-6 mb-8">
              {Array.isArray(modifiedText) ? (
                modifiedText.map((item, i) => (
                  <li key={i} className="mb-2">
                    {item}
                  </li>
                ))
              ) : (
                <li className="mb-2">{modifiedText}</li>
              )}
            </ul>
          );
        }
        return (
          <ol key={index} className="list-decimal pl-6 mb-8">
            {Array.isArray(modifiedText) ? (
              modifiedText.map((item, i) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))
            ) : (
              <li className="mb-2">{modifiedText}</li>
            )}
          </ol>
        );
      case "list-item":
        // Return child content; wrapping into <li> is handled by list containers above
        return (
          <React.Fragment key={index}>
            {Array.isArray(modifiedText)
              ? modifiedText.map((item, i) => (
                  <React.Fragment key={i}>{item}</React.Fragment>
                ))
              : modifiedText}
          </React.Fragment>
        );
      case "block-quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-pink-500 pl-4 italic text-gray-700 mb-8"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </blockquote>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        {post.featuredImage?.url && (
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="object-top h-full w-full erounded-t-lg"
          />
        )}
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="block lg:flex text-center items-center justify-center lg:justify-start mb-8 w-full">
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.date ? (
                <span>{moment(post.date).format("DD MMM YYYY")}</span>
              ) : (
                <span>{moment(post.createdAt).format("DD MMM YYYY")}</span>
              )}
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

          {/* Categories Section */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-gray-600 font-medium mr-2">
                Categories:
              </span>
              {post.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {post.content?.raw?.children &&
            post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemIndex) =>
                getContentFragment(itemIndex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
        </div>
      </div>

      {/* Subscribe Component */}
      <div className="px-4 lg:px-0">
        <Subscribe />
      </div>
    </div>
  );
};

export default PostDetail;
