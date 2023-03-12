import axios from 'axios';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { Button, Image, Input, Spin } from 'antd';

const API_KEY = 'AIzaSyDT6NHBBVaAfr2wX_XBhH0VU4-8rA2c_0M';

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export default function Home() {
  const [text, setText] = useState<string>('');

  const fetcher = async (url: string) => {
    const result = await axios.get(url).then((v) => v.data);
    return result;
  };
  const { data } = useSWR(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${text}&type=video&maxResults=10`,
    fetcher,
  );
  const onChangeTextCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Image
        width={200}
        height={50}
        src="https://blog.kakaocdn.net/dn/c2yJ7I/btqwXeUM6jI/a3WrMGPo9vakaDzQWepkOK/img.jpg"
      />
      <h1 style={{ color: 'red' }}>유튜브 검색하기</h1>
      <div
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'column',
          backgroundColor: 'red',
        }}
      >
        <form>
          <Input type="text" value={text} onChange={onChangeTextCallback} />
          <Button type="primary">Search</Button>
        </form>
      </div>
      {!data && <Spin />}
      {data &&
        data.items.map((item: VideoItem) => (
          <div key={item.id}>
            <h2 style={{ color: 'black' }}>{item.snippet.title}</h2>
            <Image
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <p>{item.snippet.description}</p>
          </div>
        ))}
    </div>
  );
}
