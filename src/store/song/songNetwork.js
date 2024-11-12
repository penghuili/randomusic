import { storageKeys } from '../../lib/storageKeys';
import { LocalStorage } from '../../shared/browser/LocalStorage';
import { refreshTokenIfNecessary } from '../auth/authNetwork';
import {
  isLoadingRandomSongCat,
  isLoadingTotalSongsCountCat,
  randomSongCat,
  totalSongsCountCat,
} from './songCats';

export async function fetchTotalSongsCount() {
  const savedCount = LocalStorage.get(storageKeys.totalSongsCount);
  if (savedCount) {
    totalSongsCountCat.set(savedCount);
  }

  isLoadingTotalSongsCountCat.set(true);

  await refreshTokenIfNecessary();

  try {
    const url = 'https://api.spotify.com/v1/me/tracks?limit=1&offset=0';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalStorage.get(storageKeys.accessToken)}`,
      },
    });
    const res = await response.json();
    const total = res?.total || 0;

    totalSongsCountCat.set(total);
    LocalStorage.set(storageKeys.totalSongsCount, total);
  } catch (error) {
    console.log(error);
  }

  isLoadingTotalSongsCountCat.set(false);
}

export async function fetchRandomSong() {
  const total = totalSongsCountCat.get();
  if (!total) {
    return;
  }

  isLoadingRandomSongCat.set(true);

  await refreshTokenIfNecessary();

  try {
    const offset = Math.floor(Math.random() * total);

    const url = `https://api.spotify.com/v1/me/tracks?limit=1&offset=${offset}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalStorage.get(storageKeys.accessToken)}`,
      },
    });
    const res = await response.json();

    const song = res?.items?.[0];
    if (song) {
      randomSongCat.set({ ...song.track, added_at: song.added_at });
    }
  } catch (error) {
    console.log(error);
  }

  isLoadingRandomSongCat.set(false);
}
