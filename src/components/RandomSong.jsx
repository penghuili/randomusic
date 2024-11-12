import { Button, Card, Spin, Typography } from '@douyinfe/semi-ui';
import { RiRefreshLine } from '@remixicon/react';
import React, { useEffect } from 'react';
import { useCat } from 'usecat';

import { Flex } from '../shared/semi/Flex';
import { IconButton } from '../shared/semi/IconButton.jsx';
import { ItemsWrapper } from '../shared/semi/ItemsWrapper.jsx';
import { Link } from '../shared/semi/Link.jsx';
import {
  isLoadingRandomSongCat,
  isLoadingTotalSongsCountCat,
  randomSongCat,
  totalSongsCountCat,
} from '../store/song/songCats.js';
import { fetchRandomSong, fetchTotalSongsCount } from '../store/song/songNetwork.js';

export function RandomSong() {
  const totalCount = useCat(totalSongsCountCat);
  const isLoadingTotal = useCat(isLoadingTotalSongsCountCat);
  const isLoading = useCat(isLoadingRandomSongCat);
  const randomSong = useCat(randomSongCat);

  useEffect(() => {
    fetchTotalSongsCount().then(() => fetchRandomSong());
  }, []);

  return (
    <ItemsWrapper>
      {totalCount && (
        <Typography.Title heading={5} style={{ marginTop: '1rem' }}>
          You liked {totalCount} songs.{' '}
          <IconButton
            theme="borderless"
            icon={isLoadingTotal ? <Spin /> : <RiRefreshLine />}
            onClick={fetchTotalSongsCount}
          />
        </Typography.Title>
      )}

      <Button
        theme="solid"
        onClick={async () => {
          await fetchRandomSong();
        }}
        disabled={isLoading || !totalCount}
      >
        Get a random song
      </Button>

      {!!randomSong && (
        <Flex align="center">
          <Card
            cover={<img alt="example" src={randomSong.album.images[0].url} />}
            style={{ width: 300 }}
          >
            <Typography.Title heading={5}>{randomSong.name}</Typography.Title>
            <Typography.Paragraph>
              {randomSong.artists.map(a => (
                <Link
                  key={a.id}
                  href={a.external_urls.spotify}
                  target="_blank"
                  style={{ marginRight: '0.5rem' }}
                >
                  {a.name}
                </Link>
              ))}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Link href={randomSong.album.external_urls.spotify} target="_blank">
                {randomSong.album.name}
              </Link>
            </Typography.Paragraph>

            <Typography.Paragraph style={{ marginTop: '1rem' }}>
              <Link href={randomSong.external_urls.spotify} target="_blank">
                Open in Spotify
              </Link>
            </Typography.Paragraph>
          </Card>
        </Flex>
      )}
    </ItemsWrapper>
  );
}